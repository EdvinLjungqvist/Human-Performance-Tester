import Form from "../../../../components/Form";
import "./style.css";

const Menu = () => {
    return (
        <div className="menu">
            <div className="menu-inner">
                <div className="title-container">
                    <h2>
                        Main menu
                    </h2>
                </div>
                <Form>
                    <label>
                        Select a game
                        <select name="game-types">
                            <option value="verbal-memory">Verbal memory</option>
                            <option value="reaction-time">Reaction time</option>
                        </select>
                    </label>
                    <input type="submit" value="Start" />
                </Form>
            </div>
        </div>
    );
};

export default Menu;
