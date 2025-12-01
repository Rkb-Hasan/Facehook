import React from "react";

export default function Field({ label, children, htmlFor, error, img }) {
  const id = htmlFor || getChildId(children);
  return (
    <div className="form-control">
      {label && (
        <label
          htmlFor={id}
          className={`auth-label text-[14px] md:text-base ${
            img && "flex gap-1"
          }`}
        >
          {label} {img && <img className="w-5 md:w-7" src={img} alt={label} />}
        </label>
      )}
      {children}
      {!!error && (
        <div role="alert" className="text-red-600">
          {error.message}
        </div>
      )}
    </div>
  );
}

const getChildId = (children) => {
  const child = React.Children.only(children);

  if ("id" in child?.props) {
    return child.props.id;
  }
};
