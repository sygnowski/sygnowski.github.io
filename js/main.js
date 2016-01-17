var SiteNav = React.createClass({
    getInitialState: function () {
        return {selectedNav: []};
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