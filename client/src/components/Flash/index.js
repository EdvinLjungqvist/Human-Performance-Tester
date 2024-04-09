import React, { useEffect, useState } from "react";
import { useFlash } from "../../hooks/FlashProvider";
import "./style.css";

const Flash = () => {
    const [animationKey, setAnimationKey] = useState(0);
    const { flash, setFlash } = useFlash();

    const close = () => {
        setFlash(null);
    }

    useEffect(() => {
        if (flash) {
            const timer = setTimeout(() => {
                setFlash(null);
            }, 3000);
            setAnimationKey(animationKey + 1);

            return () => {
                clearTimeout(timer);
            };
        }
    }, [flash])

    return flash ? (
        <div key={animationKey} className="flash">
            <span id="flash-duration" />
            <div className="flash-container">
                <div className="flash-content">
                    <h4 className={`flash-title ${flash.category.class}`}>
                        <i className={flash.category.icon} /> {flash.category.name}!
                    </h4>
                    <p>
                        {flash.message}
                    </p>
                </div>
                <button onClick={close} className="flash-button">
                    <i className="fa-solid fa-circle-xmark" />
                </button>
            </div>
        </div>
    ) : (
        null
    )
};

const category = {
    success: {
        icon: "fa-solid fa-circle-check",
        name: "Success",
        class: "success"
    },
    info: {
        icon: "fa-solid fa-circle-info",
        name: "Info",
        class: "info"
    },
    error: {
        icon: "fa-solid fa-triangle-exclamation",
        name: "Error",
        class: "error"
    }
};

export default Flash;
export {
    category
};
