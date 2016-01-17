var SiteNav = React.createClass({

    getInitialState: function () {
        return {selectedNav: []};
    },


    handelSelect: function () {
        console.log('handle select ');
    },


    render: function () {

        var navItems = this.props.data.map(function (link) {
            return <SiteNavItem key={link.id} navInfo={link}/>
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
        console.log('on click ');

        //this.props.onHandleSelect();
    },

    render: function () {
        return <a onClick={this.handleClick} href={this.props.navInfo.link}
                  className="list-group-item">{this.props.navInfo.title}</a>;
    }
});


var AboutMe = React.createClass({

    handleClick: function (link) {
        console.log('on click ' + link);
    },
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