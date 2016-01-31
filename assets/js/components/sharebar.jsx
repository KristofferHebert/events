import {
  ShareButtons,
  ShareCounts,
  generateShareIcon
} from 'react-share';

const {
  FacebookShareButton,
  GooglePlusShareButton,
  LinkedinShareButton,
  TwitterShareButton
} = ShareButtons;

const {
  FacebookShareCount,
  GooglePlusShareCount,
  LinkedinShareCount,
  TwitterShareCount
} = ShareCounts;

const FacebookIcon = generateShareIcon('facebook')
const TwitterIcon = generateShareIcon('twitter')
const GooglePlusIcon = generateShareIcon('google')
const LinkedinIcon = generateShareIcon('linkedin')

const ShareBar = React.createClass({
    getDefaultProps(){
        return {
            url: '#',
            title: 'Title'
        }
    },
    render(){
        return (
            <section className="share-bar cf">
                <h3 className="center mb">Share</h3>
                    <div className="centered share-bar-button-container">
                        <FacebookShareButton url={this.props.url} title={this.props.title} className="share-bar-button">
                            <FacebookIcon
                              size={32}
                              round={true}
                              className="share-bar-icon"
                              />
                        </FacebookShareButton>
                        <GooglePlusShareButton url={this.props.url} title={this.props.title} className="share-bar-button">
                            <GooglePlusIcon
                              size={32}
                              round={true}
                              className="share-bar-icon"
                              />
                        </GooglePlusShareButton>
                        <TwitterShareButton url={this.props.url} title={this.props.title} className="share-bar-button">
                              <TwitterIcon
                                size={32}
                                round={true}
                                className="share-bar-icon"
                                />
                        </TwitterShareButton>
                        <LinkedinShareButton url={this.props.url} title={this.props.title} className="share-bar-button">
                            <LinkedinIcon
                              size={32}
                              round={true}
                              className="share-bar-icon"
                              />
                        </LinkedinShareButton>
                    </div>
            </section>
        )
    }
})

export default ShareBar
