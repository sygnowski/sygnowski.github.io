var AboutMe = React.createClass({
    render: function () {
        return (
            <div>
                <div className="container">
                    <div className="page-header">
                        <h1>About Me</h1>
                    </div>
                    <p className="lead">Mariusz Sygnowski</p>
                </div>

                <footer>
                    <div className="container">
                        <p className="text-muted">2016</p>
                    </div>
                </footer>
            </div>)
    }
});


ReactDOM.render(
    <AboutMe />,
    document.getElementById('main')
);