import { Button } from 'antd';
import { SaveOutlined } from '@ant-design/icons';
import { translate } from 'react-jhipster';
import React, { Component } from 'react';

class App extends Component {
  state = {
    loadings: [],
  };

  enterLoading = index => {
    this.setState(( loadings ) => {
      const newLoadings = [{ ...loadings }];
      newLoadings[index] = true;

      return {
        loadings: newLoadings,
      };
    });
    setTimeout(() => {
      this.setState(( loadings ) => {
        const newLoadings = [{ ...loadings }];
        newLoadings[index] = false;

        return {
          loadings: newLoadings,
        };
      });
    }, 6000);
  };

  render() {
    const { loadings } = this.state;
    return (
        <Button
          type="primary"
          icon={<SaveOutlined />}
          htmlType="submit"
          loading={loadings[1]}
          onClick={() => this.enterLoading(1)}
        >
          {translate('entity.action.save')}
        </Button>

    );
  }
}

export default App;
