#!/bin/bash

# List of component names
components=(
    "InputBase" "InputLabel" "InputControl" "InputIcon" "InputHelperText"
    "InputErrorMessage" "InputGroup" "TextAreaControl" "NumberInput" "DatePicker"
    "TimePicker" "FileUpload" "ColorPicker" "SelectBase" "MultiSelect" "Combobox"
    "AutoComplete" "CheckboxGroup" "RadioGroup" "ToggleSwitch" "ScrollArea"
    "Badge" "Pill" "Tooltip" "Popover" "ValidationSummary" "ConfirmDialog"
    "FormActions" "ProgressIndicator" "LoadingSpinner" "ValidationIcon"
    "FormGroup" "FormRow" "FormDivider" "FormMessage" "FormSection"
    "FormGrid" "FormStepper" "FormAccordion" "FormTabs" "FieldArray"
    "DynamicField"
)

# Loop through each component and create folder and files
for component in "${components[@]}"
do
    # Create component directory
    mkdir -p "$component"
    echo "Created directory $component"

    # Create index.ts
    touch "$component/index.ts"
    echo "Created $component/index.ts"

    # Create <component_name>.tsx
    touch "$component/${component}.tsx"
    echo "Created $component/${component}.tsx"

    # Create TODO.md
    touch "$component/TODO.md"
    echo "Created $component/TODO.md"

    # Create styled.ts
    touch "$component/styled.ts"
    echo "Created $component/styled.ts"

    # Create types.ts
    touch "$component/types.ts"
    echo "Created $component/types.ts"
done