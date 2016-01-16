var AboutMe = React.createClass({
    render: function () {
        return (
            <div>
                <div className="container">
                    <div className="page-header">
                        <h1>{this.props.data.title}</h1>
                    </div>
                    <p className="lead">{this.props.data.name}</p>
                </div>

                <footer>
                    <div className="container">
                        <p className="text-muted">{this.props.data.year}</p>
                    </div>
                </footer>
            </div>)
    }
});


ReactDOM.render(
    <AboutMe data={appData} />,
    document.getElementById('main')
);