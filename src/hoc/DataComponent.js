/**
 * HOC 高阶组件 for data fetching
 */
import React from 'react';

const DataComponent = (ComposedComponent, url) =>
  class NewComponent extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        data: [],
        loading: false
      };

      this._getData = this._getData.bind(this);
      this.fetchByParam = this.fetchByParam.bind(this);
    }

    _getData(param = {}) {
      // 如果 param 传入 url 参数则根据此 url 进行查询，不然根据顶层传入 url 参数查询
      if (param.url) {
        url = param.url;
      }

      this.setState({ loading: true });

      fetch(url).then((response) => response.json()).then((data) => {
        if (this._isMount) {
          this.setState({ loading: false, data: data.items, param });
        }
      });
    }

    fetchByParam(param) {
      this._getData(param);
    }

    componentWillMount() {
      this._getData();
    }

    componentDidMount() {
      this._isMount = true;
    }

    componentWillUnmount() {
      this._isMount = false;
    }

    // only for solution 4. 返回的NewComponent作为子组件，父组件状态作为props传到子组件
    // 父组件状态改变的时候，自组件props发生改变，该方法触发，根据传入的param进行数据查询
    componentWillReceiveProps(nextProps) {
      // console.log(`nextProps`, nextProps.param);
      // call getData only when param props changed. Other props change will enter componentWillReceiveProps too, but we don't want to fetch data
      if (nextProps.param) {
        this._getData(nextProps.param);
      }
    }

    render() {
      return (
        <div className="data-component">
          {this.state.loading ? (
            <p
              style={{
                textAlign: 'center',
                fontSize: '20px'
              }}
            >
              Loading...
            </p>
          ) : (
            <ComposedComponent {...this.state} {...this.props} fetchByParam={this.fetchByParam} />
          )}
        </div>
      );
    }
  };

export default DataComponent;
