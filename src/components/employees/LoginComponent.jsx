class LoginComponent extends Component {

    constructor(props) {
        super(props)
        this.state = {
            username: 'Anusha',
            passowrd: '',
            loginSuccess: false,
            loginFailed: false
        }
        // this.handleUsernameChange = this.handleUsernameChange.bind(this)
        // this.handlePasswordChange = this.handlePasswordChange.bind(this)
    }

    // handleUsernameChange = (event) => {
    //     console.log(event.target.value);
    //     this.setState(
    //         {
    //             username: event.target.value
    //         }
    //     )
    // }
    // handlePasswordChange = (event) => {
    //     console.log(event.target.value);
    //     this.setState(
    //         {
    //             password: event.target.value
    //         }
    //     )
    // }

    loginClicked = () => {
        console.log("inside login clicked");
        if (this.state.username === "Anusha" && this.state.password === "password") {
            this.setState({ loginSuccess: true })
            this.setState({ loginFailed: false })
        } else {
            this.setState({ loginSuccess: false })
            this.setState({ loginFailed: true })
        }

    }
    handleChange = (event) => {
        console.log(this.state);
        this.setState(
            {
                [event.target.name]: event.target.value
            }
        )
    }
    render() {
        return (
            <>
                {this.state.loginSuccess && <div>Login Successful</div>}
                {this.state.loginFailed && <div>Invalid Credentials</div>}
                User Name: <input type="text" name="username" value={this.state.username} onChange={this.handleChange} />
                Password: <input type="password" name={this.state.password} onChange={this.handleChange} />
                <Button variant="contained" color="primary" onCick={this.loginClicked}>
                    Login
                </Button>
            </>
        )
    }
}