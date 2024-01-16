
import "./Button.css";

export default function Button(props) {

    function submitFunction() {
        props.onSubmit();
    }

    return (
        <>
            <button className="button" onClick={submitFunction} disabled={!props.visible}>Tovább</button>
        </>
    )
}