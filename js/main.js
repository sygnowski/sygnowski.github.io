var SiteNav = React.createClass({
    render: function () {
        return (
            <div className="col-md-2 list-group">
                {this.props.data.map(function (link) {
                    return <SiteNavItem key={link.id} navInfo={link}/>
                })}
            </div>
        )
    }
});

var SiteNavItem = React.createClass({
    render: function () {
        return <a href={this.props.navInfo.link} className="list-group-item">{this.props.navInfo.title}</a>;
    }
});


var AboutMe = React.createClass({
    render: function () {
        return (
            <div className="container">
                <div className="row">
                    <SiteNav data={this.props.data.pageNav}/>

                    <div className="col-md-6">
                        <div>
                            <div className="page-header">
                                <h1>{this.props.data.title}</h1>
                            </div>
                            <p className="lead">{this.props.data.name}</p>
                        </div>
                    </div>

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
    <AboutMe data={appData}/>,
    document.getElementById('main')
);