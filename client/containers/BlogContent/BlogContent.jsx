import React, {Component} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Actions from '../../actions/Blogs';
import Draft,{Editor, EditorState, ContentState, RichUtils} from 'draft-js';
require('./index.css');

function getBlockStyle(contentBlock){
    const blockType = contentBlock.getType();
    if(blockType==='blockquote'){
        return 'superFancyBlockquote';
    }
}

const styleMap={
    'CODE':{
        backgroundColor: 'rgba(0, 0, 0, 0.05)',
        fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
        fontSize: 16,
        padding: 2
    }
};

class BlogContent extends Component {
    constructor(props) {
        super(props);
        this.state = {editorState: EditorState.createEmpty()};
    }

    componentWillMount(){
        let {actions,blogContent} = this.props;
        actions.initBlogContent(this.props.params.id);
        console.log(JSON.stringify(blogContent));

        //this.setState({editorState: EditorState.createWithContent(ContentState.createFromBlockArray([blogContent]))});
    }

    componentWillReceiveProps(nextProps){
        if(nextProps!==this.props){
            this.setState({editorState: EditorState.createWithContent(Draft.convertFromRaw(nextProps.blogContent))});
        }
    }

    render() {
        const {blogContent} = this.props;
        return (
            <div className="blogContentWrap container">
                <Editor
                    editorState={this.state.editorState}
                    blockStyleFn={getBlockStyle}
                    customStyleMap={styleMap}
                    readOnly={true} />
                {/*{JSON.stringify(blogContent)}*/}
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        blogContent: state.blogs.blogContent.content
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(Actions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(BlogContent);