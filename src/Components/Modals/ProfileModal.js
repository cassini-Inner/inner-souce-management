import React from "react";
import { Link } from "react-router-dom";
import { LogOut } from "react-feather";

class ProfileModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mouseInside: true,
        };

        this.close = this.close.bind(this);
        this.handleMouseEnter = this.handleMouseEnter.bind(this);
        this.modalBody = React.createRef(this);
    }

    componentDidMount() {
        this.focusModal();
    }

    componentDidUpdate() {
        if (this.state.active)
            this.focusModal();
    }

    focusModal() {
        this.modalBody.current.focus();
    }

    close(e) {
        const currentTarget = e.currentTarget;

        // Check the newly focused element in the next tick of the event loop
        setTimeout(() => {
            console.log("lol")
            // Check if the new activeElement is a child of the original container
            if (!currentTarget.contains(document.activeElement)) {
                // You can invoke a callback or add custom logic here
                this.props.close();
            }
        }, 0);
    }

    handleMouseEnter() {
        this.setState({ mouseInside: true });
    }
    render() {
        const style = {
            left: ((this.props.rect.x + window.scrollX - 250) + "px"),
            top: ((this.props.rect.y + window.scrollY) + "px"),
            position: "fixed",
        };

        return (
            <div  ref={this.modalBody} className="appearance-none select-none outline-none" tabIndex="-1" onBlur={e => this.close(e)} style={style} >
                <div className="max-w-x w-full shadow-lg shadow-2xl rounded-lg p-4 pr-20 z-50 bg-white" >
                    <div className="flex p-4" >
                        <img src="../assets/icons/Ellipse 1.png" className="flex-0 h-12 w-12 rounded-full" />
                        <div className="font-semibold leading-tight ml-8">
                            <p className="text-nebula-grey-600 text-xs">Signed in as</p>
                            <p className="text-lg mb-2">Tushar Paliwal</p>
                            <Link to="/profile" className="text-xs text-nebula-blue tracking-widest">VIEW PROFILE</Link>
                        </div>
                    </div>
                    <hr />
                    <Link to="/login" className="flex mt-4 text-nebula-blue font-semibold" >
                        <LogOut className="stroke-current ml-4 mr-8" />
                        <p>Logout</p>
                    </Link>
                </div>
            </div>
        );
    }
}

export default ProfileModal;