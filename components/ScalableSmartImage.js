
import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Image } from 'react-native';
import { actions as ImageCacheAction } from '../reducers/ImageCache';
import resolveAssetSource from 'react-native/Libraries/Image/resolveAssetSource';

class ScalableSmartImage extends React.Component {
  static propTypes = {
    localUri: PropTypes.string,
    source: PropTypes.shape({
      uri: PropTypes.string.isRequired,
      filename: PropTypes.string.isRequired,
    }).isRequired,
    imageCacheAction: PropTypes.shape({
      fetch: PropTypes.func.isRequired,
    }).isRequired,
    width: PropTypes.number,
    height: PropTypes.number,
    onPress: PropTypes.func,
    onSize: PropTypes.func,
    background: PropTypes.bool,
  };

  static defaultProps = {
    localUri: null,
    onSize: size => {},

    background: false,
  };

  constructor(props) {
    super(props);

    this.state = {
        size: {
            width: null,
            height: null,
        }
    };

    this.forceUpdate = false;

    this.mounted = false;
}

  componentWillMount() {
    this.props.imageCacheAction.fetch(this.props.source);
  }

  componentDidMount() {
    this.mounted = true;
    this.onProps(this.props);
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  shouldComponentUpdate(nextProps) {
    if (this.forceUpdate) {
      this.forceUpdate = false;
      return true
    } else if (this.props.localUri !== nextProps.localUri) {
      this.onProps(nextProps);
      return true
    } else {
      return false
    }
  }

  getSource() {
    if (!this.props.localUri) {
      return require('../images/temppreview.png');
    } else {
      return { uri: this.props.localUri };
    }
  }

  onProps(props) {
    if (props.localUri) {
        const source = props.localUri ? props.localUri : props.source;
        Image.getSize(source, (width, height) => this.adjustSize(width, height, props), console.log);
    }
    else {
      const source = resolveAssetSource(this.getSource());
      this.adjustSize(source.width, source.height, props);
    }
  }

  adjustSize(sourceWidth, sourceHeight, props) {
    const { width, height, maxWidth, maxHeight } = props;

    let ratio = 1;

    if (width && height) {
        ratio = Math.min(width / sourceWidth, height / sourceHeight);
    }
    else if (width) {
        ratio = width / sourceWidth;
    }
    else if (height) {
        ratio = height / sourceHeight;
    }

    if (this.mounted) {
      this.forceUpdate = true;
        this.setState({
            size: {
                width: sourceWidth * ratio,
                height: sourceHeight * ratio
            }
        }, () => this.props.onSize(this.state.size));
    }
  }

  render() {
    return (
      <Image
        {...this.props}
        style={[this.props.style, this.state.size]}
        source={this.getSource()}
      />
    );
  }
}

export default connect(
  (state, props) => {
    const { loading, loaded } = state.ImageCache;
    return {
      loading: loading.includes(props.source.uri),
      localUri: loaded[props.source.uri],
    };
  },
  (dispatch) => ({
    imageCacheAction: bindActionCreators(ImageCacheAction, dispatch)
  }),
)(ScalableSmartImage);
