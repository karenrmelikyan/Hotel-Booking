/*
    Possible styles:

    success,
    info,
    warning,
    danger,
    other
  */

const Label = (props) => {
    return (
        <>
            <span className={`label ${props.color}`}>{props.name}</span>
        </>
    );
};

export default Label;