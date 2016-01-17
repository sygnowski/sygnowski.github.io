var SiteNav = React.createClass({
    getInitialState: function () {
        var firstNavItemId = this.props.data[0].id;
        return {selectedNav: [firstNavItemId]};
    },
    handelSelect: function (link) {
        this.setState({selectedNav: [link.id]});
        this.props.onNav(link);
    },
    render: function () {
        var hnd = this.handelSelect;
        var selection = this.state.selectedNav;
        var navItems = this.props.data.map(function (link) {

            var isSelected = -1 != selection.indexOf(link.id);

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
    handleClick: function (link) {
        console.log(link);
        this.props.onHandleSelection(link);
    },
    render: function () {
        var css = "list-group-item";
        if (this.props.isSelected) {
            css += " active";
        }

        return <a id={this.props.navInfo.id}
                  onClick={this.handleClick.bind(this, this.props.navInfo)}
                  className={css}>{this.props.navInfo.title}</a>;
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
    handleNav: function (link) {
        console.log("on nav");
        this.requestData(link.link);
    },

    requestData: function (dataUrl) {
        $.ajax({
            url: dataUrl,
            dataType: 'json',
            type: 'GET',
            success: function (data) {
                this.setState(data);
            }.bind(this),
            error: function (xhr, status, err) {
                console.error('ajax', status, err.toString());
            }.bind(this)
        });
    },

    getInitialState: function () {
        return ({
            title: this.props.data.title,
            text: this.props.data.name
        });
    },

    render: function () {
        return (
            <div className="container">
                <div className="row">
                    <SiteNav onNav={this.handleNav} data={this.props.data.pageNav}/>

                    <div className="col-md-6">
                        <Content title={this.state.title} text={this.state.text}/>
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