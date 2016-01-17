var SiteNav = React.createClass({
    getInitialState: function () {
        var firstNavItemId = String(this.props.data[0].id);
        return {selectedNav: [firstNavItemId]};
    },
    handelSelect: function (id) {
        this.setState({selectedNav: [id]})
    },
    render: function () {
        var hnd = this.handelSelect;
        var selection = this.state.selectedNav;
        var navItems = this.props.data.map(function (link) {

            var isSelected = -1 != selection.indexOf(String(link.id));

            return <SiteNavItem onHandleSelection={hnd} key={link.id} navInfo={link} isSelected={isSelected}/>
        });

        return (
            <div className="col-md-2 list-group">
                {navItems}
            </div>
        )
    }
});

var SiteNavItem = React.createClass({
    getInitialState: function () {
        return {isSelected: false};
    },
    handleClick: function (event) {
        this.props.onHandleSelection(event.target.id);
    },
    render: function () {
        var css = "list-group-item";
        if (this.props.isSelected) {
            css += " active";
        }

        return <a id={this.props.navInfo.id}
                  onClick={this.handleClick}
                  href={this.props.navInfo.link} className={css}>{this.props.navInfo.title}</a>;
    }
});


var Content = React.createClass({
    render: function () {
        return (
            <div>
                <div className="page-header">
                    <h1>{this.props.title}</h1>
                </div>
                <p className="lead">{this.props.text}</p>
            </div>
        )
    }
});


var AboutMe = React.createClass({

    render: function () {
        return (
            <div className="container">
                <div className="row">
                    <SiteNav data={this.props.data.pageNav}/>
                    <div className="col-md-6">
                        <Content title={this.props.data.title} text={this.props.data.name}/>
                    </div>
                </div>
                <footer className="footer">
                    <p className="text-muted text-center">{this.props.data.year}, powered by ReactJS, Bootstrap.
                        <small>version: {this.props.data.version}</small>
                    </p>
                </footer>
            </div>)
    }
});


ReactDOM.render(
    <AboutMe data={appData}/>,
    document.getElementById('main')
);