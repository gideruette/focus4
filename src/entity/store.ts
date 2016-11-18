import {isArray, isObject, isUndefined, mapValues, omitBy} from "lodash";
import {asReference, isObservableArray, observable, IObservableArray, action, isAction} from "mobx";

import {Entity, EntityField, EntityList} from "./types";

export interface Setter<T> {
    set(config: T): void;
}

export interface Clearer {
    clear(): void;
}

export interface ClearSet<T> extends Setter<T>, Clearer {}

export type EntityArray<T> = IObservableArray<T> & {$entity: Entity} & Setter<{}[]>;
function isEntityArray(data: StoreTypes): data is EntityArray<any> {
    return isObservableArray(data);
}
function isEntityStoreData(data: StoreTypes): data is EntityStoreData {
    return !isObservableArray(data) && isObject(data) && !isAction(data);
}

export type EntityValue<T> = EntityField<T> | EntityList<T>;
export type StoreTypes = undefined | null | number | boolean | string | EntityStoreEntry;

export type EntityStoreData = {[key: string]: EntityStoreValue} & ClearSet<{}>;
export type EntityStoreEntry = EntityStoreData | EntityArray<EntityStoreData>;
export type EntityStoreValue = EntityValue<StoreTypes>;

export type EntityStoreConfig = {[key: string]: EntityStoreEntry}
export type EntityConfig = {[key: string]: {[field: string]: EntityValue<{}>} | [{[field: string]: EntityStoreValue}, string] | [{[field: string]: EntityStoreValue}[], string]};
export type EntityStore = EntityStoreConfig & ClearSet<{}>;

/**
 * Construit un store d'entité à partir de la config et les entités données.
 * Le store d'entité inclut les métadonnées pour tous les champs des entités utilsées.
 * @param config L'objet constituant du store, dont chaque propriété doit correspondre à une entité. Les valeurs possibles sont "{}", [{}, "entityName"] ou [[], "entityName"] (pour une liste).
 * @param entityList La liste des toutes les entités utilisées par les propriétés du store (y compris les composées).
 */
export function makeEntityStore<T extends EntityStoreConfig>(config: EntityConfig, entityList: Entity[]): T & ClearSet<{}> {
    const entityMap = entityList.reduce((entities, entity) => {
        entities[entity.name] = entity;
        return entities;
    }, {} as {[name: string]: Entity});

    for (const item in config) {
        const entity = config[item];
        if (!entityMap[isArray(entity) ? entity[1] : item]) {
            throw new Error(`La propriété "${item}" n'a pas été trouvée dans la liste d'entités`);
        }
    }

    const entityStore: EntityStore = {} as any;

    for (const entry in config) {
        entityStore[entry] = buildEntityEntry(config, entityMap, entry);
    }

    entityStore.set = action(function set(this: typeof entityStore, setConfig: {[key: string]: any}) {
        for (const entry in setConfig) {
            const entity = this[entry];
            if (!entity) {
                throw new Error(`"${entry}" n'existe pas dans ce store.`);
            }
            setEntityEntry(entity, entityMap, setConfig[entry], entry);
        }
    });

    entityStore.clear = asReference(function clear(this: typeof entityStore) {
        for (const entry in this) {
            clearEntity(this[entry]);
        }
    });

    return observable(entityStore) as any;
}

function buildEntityEntry(config: EntityConfig, entityMap: {[name: string]: Entity}, entry: string): EntityStoreEntry {
    const entity = config[entry];
    if (isArray(entity) && isArray(entity[0])) {
        const output: EntityArray<EntityStoreData> = observable([]) as any;
        output.$entity = entityMap[entity[1]];
        output.set = action(function set(this: typeof output, values: {}[]) { setEntityEntry(this, entityMap, values, entity[1]); });
        return output;
    }

    const trueEntry = isArray(entity) ? entity[1] : entry;
    const output: EntityStoreData & Setter<{}> = mapValues(entityMap[trueEntry].fields, (v, key) => {
        if (v.entityName && !entityMap[v.entityName]) {
            throw new Error(`L'entité "${trueEntry}" dépend de l'entité "${v.entityName}" qui n'a pas été trouvée dans la liste.`);
        }
        return {
            $entity: asReference(entityMap[trueEntry].fields[key!]),
            value: v.entityName ? buildEntityEntry({[v.entityName]: [v.type === "list" ? [] : {}, v.entityName!]}, entityMap, v.entityName!) : undefined,
        };
    }) as any;
    output.set = action(function set(this: typeof output, entityValue: any) { setEntityEntry(this, entityMap, entityValue, trueEntry); });
    output.clear = asReference(action(function clear(this: typeof output) { clearEntity(this); }));
    return output;
}

function setEntityEntry(entity: EntityStoreEntry, entityMap: {[name: string]: Entity}, entityValue: any, entry: string) {
    if (isArray(entityValue) && isEntityArray(entity)) {
        entity.replace(entityValue.map((item: {}) => buildEntityEntry({[entry]: [{}, entry]}, {...entityMap, [entry]: entity.$entity}, entry) as EntityStoreData));
        for (let i = 0; i < entityValue.length; i++) {
            setEntityEntry(entity[i], entityMap, entityValue[i], entity.$entity.name);
        }
    } else {
        const entity2 = entity as EntityStoreData;
        for (const item in entityValue) {
            if (!entity2[item]) {
                throw new Error(`"${entry}" n'a pas de propriété "${item}".`);
            }
            entity2[item].value = isObject(entityValue[item]) ? setEntityEntry(entity2[item].value as EntityStoreEntry, entityMap, entityValue[item], item) : entityValue[item];
        }
    }

    return entity;
}

function clearEntity(entity: EntityStoreEntry) {
    if (isEntityArray(entity)) {
        entity.replace([]);
    } else {
        for (const entry in entity) {
            const {value} = entity[entry];
            if (isEntityStoreData(value)) {
                clearEntity(value);
            } else if (isEntityArray(value)) {
                value.replace([]);
            } else if (value !== undefined) {
                entity[entry].value = undefined;
            }
        }
    }
}

/** Met à plat une entité / liste d'entité pour récupèrer sa valeur "brute". */
export function toFlatValues(entityStoreItem: EntityStoreEntry): {} {
    if (isEntityArray(entityStoreItem)) {
        return entityStoreItem.map(toFlatValues);
    } else {
        return omitBy(mapValues(entityStoreItem, item => {
            const {value} = item;
            if (isEntityArray(value)) {
                return value.map(toFlatValues);
            }
            if (isEntityStoreData(value)) {
                return toFlatValues(value);
            }
            return value;
        }), isUndefined);
    }
}
