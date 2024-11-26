import React, { RefObject } from "react";

interface FormProps {
  children: React.ReactNode;
  onSubmit: React.FormEventHandler<HTMLFormElement>;
  ref?: RefObject<HTMLFormElement>;
  action?: any;
  forLargeScreen?: boolean;
}

const CustomForm: React.FC<FormProps> = ({ children, onSubmit, action,forLargeScreen, ...rest }) => {
  return (
    <form {...rest} action={action} onSubmit={onSubmit} >
      {React.Children.map(children, (child) => {
        const childElement = child as React.ReactElement<any>;
        return childElement?.props?.name
          ? React.createElement(childElement.type, {
              ...(childElement.props as Record<string, any>),
              register: () => {},
              key: childElement.props.name,
            })
          : child;
      })}
    </form>
  );
};

export default CustomForm;
