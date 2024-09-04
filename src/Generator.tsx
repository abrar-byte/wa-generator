import React, { FormEvent, useState } from "react";
import Input from "./components/Input";
import Button from "./components/Button";
import countries from "./utils/phone_country_code.json";
import {
  MappingFunction,
  createOptions,
  validatePhoneNumber,
} from "./utils/helpers";
import Select, { components } from "react-select";
import CopyToClipBoard from "./components/CopyToClipBoard";
import PreviewMessage from "./components/PreviewMessage";

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

const customStyles = {
  control: (styles: any, { isDisabled }: any) => {
    return {
      ...styles,

      // border: 0,
      // This line disable the blue border
      boxShadow: "none",
    };
  },
};

const customClass = {
  control: (state: any) => {
    const classBorder = state.isFocused ? "border-3 border-red-600" : "";
    return `!h-5 w-[100px] !bg-slate-50 !whitespace-nowrap  !text-[8px] ${classBorder}`;
  },
  menuPortal: () => "!z-[50]",
};
const customMap: MappingFunction = (item) => ({
  label: (
    <div className="flex justify-between items-center w-full">
      <img
        className="w-4 h-4"
        src={`https://flagsapi.com/${item.country_code}/flat/64.png`}
        alt={item.country_en}
      />
      <span>{`+ ${item.phone_code}`}</span>
    </div>
  ),
  value: `${item.phone_code}-${item.country_en}`,
});
export default function Generator() {
  const [form, setForm] = useState({ code: "", number: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [link, setLink] = useState("");
  const [error, setError] = useState({
    phone: "",
    message: "",
  });
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      if (!validatePhoneNumber(`${form?.number}`)) {
        setError({
          ...error,
          phone: "Invalid Whatsapp Number",
        });
        return;
      }
      setError({
        phone: "",
        message: "",
      });
      setLink(
        `https://wa.me/${form?.code}${form?.number}?text=${form?.message}`
      );
    } catch (error) {
      console.log("error", error);
    } finally {
      setLoading(false);
    }
  };

  const onChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if(link){
      setLink('')
    }
  };

  const paddingLeft =
    form?.code.length <= 2 ? 144 : 144 + (form?.code.length - 1) * 5;

  const options = createOptions(countries, customMap);
  return (
    <div className="wrapper space-y-10 mt-10">
      <div className="text-center">
        <h1 className="text-2xl font-semibold text-neutral-900">
          Welcome to{" "}
          <i className="text-xl text-blue-600">whatsapp link generator</i>
        </h1>
        <p className="text-lg font-medium text-neutral-900">
          Create your whatsapp link easily
        </p>
      </div>
      <div className="grid lg:grid-cols-2 gap-10">
        <form
          onSubmit={handleSubmit}
          className="bg-white p-5 shadow rounded-md space-y-5 flex flex-col justify-between"
        >
          <div className="space-y-5">
            <div className="w-full relative align-middle">
              <div
                className={`space-y-2 absolute ${
                  form.code ? "z-40" : "z-50"
                } start-1 top-1 !h-5 flex  gap-1`}
              >
                <Select
                  options={options}
                  isSearchable={true}
                  instanceId={"phone_code"}
                  required
                  onChange={(e) =>
                    onChange({
                      target: { value: e.value.split("-")[0], name: "code" },
                    })
                  }
                  placeholder={"Country Code"}
                  value={options.find(
                    (option) => option.value.split("-")[0] == form.code
                  )}
                  components={{
                    Option,

                    IndicatorSeparator: () => null,
                  }}
                  styles={customStyles}
                  classNames={customClass}
                  // isDisabled={props.disabled}
                  formatOptionLabel={({ label }: any) => {
                    const value = label?.props?.children[0]?.props;
                    return (
                      <img
                        className={value.className}
                        src={value.src}
                        alt={value.alt}
                      />
                    );
                  }}
                />
                <span className="text-neutral-900 ">
                  {form.code ? `+ ${form.code}` : ""}
                </span>
              </div>

              <Input
                onChange={onChange}
                name="number"
                type="number"
                className="w-full"
                float
                required
                value={form?.number}
                error={error.phone}
                label="Whatsapp Number"
                inputClass={` pb-4`}
                labelClass={` peer-placeholder-shown:pl-44 ${
                  form?.number ? "!z-50" : "z-10"
                } `}
                style={{ paddingLeft: paddingLeft }}
              />
            </div>

            <Input
              float
              onChange={onChange}
              value={form?.message}
              name="message"
              textarea
              rows={4}
              label="Custom Message"
              maxLength={273}
            />
            <Button variant="primary" disabled={loading}>
              Generate
            </Button>
          </div>
          {link && <CopyToClipBoard text={link} />}
        </form>
        <div className="bg-blue-600 rounded-md p-5">
          <PreviewMessage message={link?form?.message:''} phone={link?`${form?.code}${form?.number}`:''} />
        </div>
      </div>
    </div>
  );
}
