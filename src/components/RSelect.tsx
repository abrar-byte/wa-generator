import Select, { components } from 'react-select';
import CreatableSelect from 'react-select/creatable';

const CustomIcon = ({ active, disabled }: any) => {
  const activeClass = active ? '' : 'border-gray-300';
  return (
    <div
      className={` ${activeClass} rounded-full border-4 p-1 h-3 w-3 text-transparent`}
    />
  );
};


const Option = (props: any) => {
  return props.selectProps.styled ? (
    <components.Option {...props}>
      <div className="flex items-center gap-4 relative !z-50">
        {props.selectProps.isMulti && (
          <input
            type="checkbox"
            className="mr-2"
            checked={props.isSelected}
            readOnly
          />
        )}
        {/* <CustomIcon active={props.isSelected} /> */}
        {props.data.label}
      </div>
    </components.Option>
  ) : (
    <components.Option {...props}>
      {props.selectProps.isMulti && (
        <input
          type="checkbox"
          className="mr-2"
          checked={props.isSelected}
          readOnly
        />
      )}
      {props.data.label}
    </components.Option>
  );
};

// const ValueContainer = ({ children, inputClass = '', ...props }: any) => {
//   if (!props.hasValue) {
//     return props.selectProps.styled ? (
//       <components.ValueContainer
//         {...props}
//         className={`mx-1 h-12 ${inputClass}`}
//       >
//         <div className="flex items-center font-medium gap-4">
//           <CustomIcon />
//           {children}
//         </div>
//       </components.ValueContainer>
//     ) : (
//       <components.ValueContainer {...props} className={`h-12 ${inputClass}`}>
//         {children}
//       </components.ValueContainer>
//     );
//   }
//   return props.selectProps.styled ? (
//     <components.ValueContainer {...props} className="mx-1">
//       <div className="flex items-center font-medium gap-4">
//         <CustomIcon active />
//         {children}
//       </div>
//     </components.ValueContainer>
//   ) : (
//     <components.ValueContainer {...props}>{children}</components.ValueContainer>
//   );
// };
const RSelect = ({
  className = '',
  inputClass = '',
  labelClass = '',
  float,
  label,
  creatable,
  outline,
  height,
  bgCustom,
  ...props
}: any) => {
  const customStyles = {
    control: (styles: any, { isDisabled }: any) => {
      return {
        ...styles,
        borderColor: outline ? '#9480E0' : '#FFF',
        backgroundColor: bgCustom || '#FFF',
        border: 0,
      // This line disable the blue border
      boxShadow: "none"
      };
    },
  };

  const customClass = {
    control: (state: any) => {
      const classBorder = state.isFocused
        ? 'border-3 border-red-600'
        : outline
          ? ''
          : '!border-0 text-start';

      return `${inputClass}  ${classBorder} `;
    },
    menuPortal: ' !z-[50]',
  };

  return (
    <div className={`${float ? 'relative' : 'space-y-2'} ${className} `}>
      {!!label && (
        <label
          className={`${labelClass} ${float ? 'text-gray-400 text-xs bg-white absolute -top-2 left-2 z-[60]' : 'text-neutral-800'} capitalize `}
        >
          {props.required ? <span className="mx-1 text-red-500">*</span> : null}
          {label}
        </label>
      )}
      {creatable ? (
        <CreatableSelect
          instanceId={props.name}
          // components={{
          //   Option,
          //   // DropdownIndicator,
          //   ValueContainer,
          //   IndicatorSeparator: () => null,
          // }}
          className={`${className} h-12 `}
          styles={customStyles}
          classNames={customClass}
          isDisabled={props.disabled}
          {...props}
        />
      ) : (
        <Select
          isSearchable={true}
          instanceId={props.name}
          components={{
            Option,
            // DropdownIndicator,
            // ValueContainer,
            IndicatorSeparator: () => null,
          }}
          styles={customStyles}
          classNames={customClass}
          isDisabled={props.disabled}
          {...props}
        />
      )}
    </div>
  );
};
export default RSelect;
