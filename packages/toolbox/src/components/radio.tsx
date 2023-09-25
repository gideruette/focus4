import classNames from "classnames";
import {createContext, ReactNode, useContext, useMemo} from "react";

import {CSSProp, useTheme} from "@focus4/styling";

import {PointerEvents} from "../utils/pointer-events";
import {useInputRef} from "../utils/use-input-ref";

import {Ripple} from "./ripple";

import radioCss, {RadioCss} from "./__style__/radio.css";
export {RadioCss, radioCss};

const RadioContext = createContext({
    disabled: false,
    onChange: undefined as ((value: string) => void) | undefined,
    value: undefined as string | undefined
});

/** Props du Radio. */
export interface RadioButtonProps extends PointerEvents<HTMLLabelElement> {
    /** Classe CSS a ajouter au composant racine. */
    className?: string;
    /** Désactive le RadioButton. */
    disabled?: boolean;
    /** Id pour l'input[type=radio] posé par le RadioButton. */
    id?: string;
    /** Libellé à poser à côté de la Checkbox. */
    label?: ReactNode;
    /** Name pour l'input[type=radio] posé par le RadioButton. */
    name?: string;
    /** CSS. */
    theme?: CSSProp<RadioCss>;
    /** Valeur du RadioGroup quand ce RadioButton est sélectionné. */
    value: string;
}

/**
 * A utiliser dans un RadioGroup.
 */
export function RadioButton({
    className = "",
    disabled = false,
    label,
    id,
    onPointerDown,
    onPointerEnter,
    onPointerLeave,
    onPointerUp,
    name,
    theme: pTheme,
    value
}: RadioButtonProps) {
    const theme = useTheme("radio", radioCss, pTheme);

    const {disabled: pDisabled, onChange, value: selectedValue} = useContext(RadioContext);
    const checked = selectedValue === value;
    disabled &&= pDisabled;

    const {ref, loaded, handleOnClick, handlePointerLeave, handlePointerUp} = useInputRef<
        HTMLInputElement,
        HTMLLabelElement
    >({
        disabled,
        onChange: () => onChange?.(value),
        onPointerLeave,
        onPointerUp,
        value: checked
    });

    return (
        <label
            className={classNames(theme.radio({checked, disabled, loading: !loaded}), className)}
            onPointerDown={onPointerDown}
            onPointerEnter={onPointerEnter}
            onPointerLeave={handlePointerLeave}
            onPointerUp={handlePointerUp}
        >
            <input
                ref={ref}
                checked={checked}
                className={theme.input()}
                disabled={disabled}
                id={id}
                name={name}
                onClick={handleOnClick}
                readOnly
                type="radio"
            />
            <Ripple disabled={disabled}>
                <div className={theme.state()}>
                    <div className={theme.outline()}>
                        <div className={theme.dot()} />
                    </div>
                </div>
            </Ripple>
            {label ? <span className={theme.label()}>{label}</span> : null}
        </label>
    );
}

export interface RadioGroupProps {
    /** Classe CSS a ajouter au composant racine. */
    className?: string;
    /** Les RadioButtons passés en enfant de ce composant seront ajoutés au groupe. */
    children?: ReactNode;
    /** Désactive les RadioButtons. */
    disabled?: boolean;
    /** Handler appelé au clic sur un RadioButton. */
    onChange?: (value: string) => void;
    /** Valeur séléctionnée parmis les RadioButtons. */
    value?: string;
}

/**
 * A utiliser avec RadioButton pour faire des radios. Les composants [`BooleanRadio`](components/forms.md#booleanradio) et [`SelectRadio`](components/forms.md#selectradio) en sont des implémentations pour les usages les plus courants.
 */
export function RadioGroup({className = "", children, disabled = false, onChange, value}: RadioGroupProps) {
    const ctx = useMemo(() => ({disabled, onChange, value}), [disabled, onChange, value]);
    return (
        <RadioContext.Provider value={ctx}>
            <div className={className}>{children}</div>
        </RadioContext.Provider>
    );
}
