'use strict';

var SiteNav = React.createClass({
    computeValue: function (width) {
        var navElt = document.getElementById("theNav");
        var navCss = window.getComputedStyle(navElt, null);
        var actualHeight = parseInt(navCss.getPropertyValue("height"));

        var maxW = this.props.dim.width;
        var h = this.props.dim.height;
        var wx = width > maxW ? maxW : width;

        var value = Math.floor(wx / maxW * h - actualHeight);
        return value >= 0 ? value : 0;
    },
    getInitialState: function () {
        var firstNavItemId = this.props.data[0].id;
        return {
            selection: [firstNavItemId],
            top: 0
        };
    },
    handleResize: function () {
        this.setState({
            top: this.computeValue(window.innerWidth),
            selection: this.state.selection
        });
    },
    componentDidMount: function () {
        this.handleResize();
        window.addEventListener('resize', this.handleResize);
    },
    componentWillUnmount: function () {
        window.removeEventListener('resize', this.handleResize);
    },

    handelSelect: function (link) {
        this.setState({
            selection: [link.id]
        });
        this.props.onNav(link);
    },
    render: function () {
        var hnd = this.handelSelect;
        var selection = this.state.selection;
        var innerContent = this.props.data.map(function (link) {

            var isSelected = -1 != selection.indexOf(link.id);

            return <SiteNav.SiteNavItem onHandleSelection={hnd} key={link.id} navInfo={link} isSelected={isSelected}/>
        });

        var style = {
            top: this.state.top
        };

        return (
            <div id="theNav" style={style} className="page-nav list-group">
                {innerContent}
            </div>
        )
    }
});

SiteNav.SiteNavItem = React.createClass({
    getInitialState: function () {
        return {isSelected: false};
    },
    handleClick: function (link) {
        this.props.onHandleSelection(link);
    },
    render: function () {
        var css = "list-group-item";
        if (this.props.navInfo.style) {
            css += " " + this.props.navInfo.style;
        }
        if (this.props.isSelected) {
            css += " active";
        }

        return <a id={this.props.navInfo.id}
                  onClick={this.handleClick.bind(this, this.props.navInfo)}
                  className={css}>{this.props.navInfo.title}</a>;
    }
})

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


var HeaderImage = React.createClass({
    getInitialState: function () {
        return {wx: window.innerWidth};
    },
    handleResize: function (e) {
        this.setState({wx: window.innerWidth});
    },
    componentDidMount: function () {
        window.addEventListener('resize', this.handleResize);
    },
    componentWillUnmount: function () {
        window.removeEventListener('resize', this.handleResize);
    },

    render() {
        var style = {
            width: this.state.wx > this.props.width ? this.props.width : this.state.wx
        }
        return (
            <div className="header-image-outer">
                <img style={style} className="header-image" src={this.props.src}/>
            </div>
        )
    }
});

var AboutMe = React.createClass({

    handleNav: function (link) {
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
            text: this.props.data.names
        });
    },

    componentDidMount: function () {
        var homeUrl = this.props.data.pageNav[0].link;
        this.requestData(homeUrl);
    },

    render: function () {
        var data = this.props.data;
        return (
            <div>
                <HeaderImage width={data.header.width} src={data.header.image}/>

                <div className="container">
                    <div className="row">
                        <SiteNav dim={data.header} onNav={this.handleNav} data={data.pageNav}/>

                        <div className="col-md-10">
                            <Content title={this.state.title} text={this.state.text}/>
                        </div>
                    </div>
                </div>
                <footer className="footer">
                    <p className="text-muted text-center">{data.year}, powered by ReactJS, Bootstrap.
                        <small>version: {data.version}</small>
                    </p>
                </footer>
            </div>)
    }
});

ReactDOM.render(
    <AboutMe data={appData}/>,
    document.getElementById('main')
);