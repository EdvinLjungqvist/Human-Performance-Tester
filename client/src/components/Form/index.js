import "./style.css";

const Form = ({ onSubmit, children }) => {
    return (
        <form onSubmit={onSubmit}>
            {children}
        </form>
    )
}

export default Form;