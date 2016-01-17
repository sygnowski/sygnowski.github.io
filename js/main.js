var SiteNav = React.createClass({

    getInitialState: function () {
        return {selectedNav: []};
    },


    handelSelect: function (id) {
        console.log('handle select ' + id);
    },


    render: function () {
        var hnd = this.handelSelect;

        var navItems = this.props.data.map(function (link) {
            return <SiteNavItem onHandleSelection={hnd} key={link.id} navInfo={link}/>
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
        return <a id={this.props.navInfo.id}
                  onClick={this.handleClick}
                  href={this.props.navInfo.link} className="list-group-item">{this.props.navInfo.title}</a>;
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