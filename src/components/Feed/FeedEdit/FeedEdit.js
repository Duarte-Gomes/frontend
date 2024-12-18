import React, { Component, Fragment } from 'react';

import Backdrop from '../../Backdrop/Backdrop';
import Modal from '../../Modal/Modal';
import Input from '../../Form/Input/Input';
import FilePicker from '../../Form/Input/FilePicker';
import Image from '../../Image/Image';
import { generateBase64FromImage } from '../../../util/image';

const POST_FORM = {
  title: {
    value: '',
    valid: false,
    touched: false,
  },
  image: {
    value: '',
    valid: false,
    touched: false,
  },
  content: {
    value: '',
    valid: false,
    touched: false,
  },
  category: {
    value: '',
    valid: false,
    touched: false,
  },
  active: {
    value: true,
    valid: false,
    touched: false,
  }
};

class FeedEdit extends Component {
  state = {
    postForm: POST_FORM,
    // formIsValid: false,
    imagePreview: null
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      this.props.editing &&
      prevProps.editing !== this.props.editing &&
      prevProps.selectedPost !== this.props.selectedPost
    ) {
      const postForm = {
        title: {
          ...prevState.postForm.title,
          value: this.props.selectedPost.title,
          valid: true
        },
        image: {
          ...prevState.postForm.image,
          value: this.props.selectedPost.imagePath,
          valid: true
        },
        content: {
          ...prevState.postForm.content,
          value: this.props.selectedPost.content,
          valid: true
        },
        category: {
          ...prevState.postForm.category,
          value: this.props.selectedPost.category,
          valid: true
        },
        active: {
          ...prevState.postForm.active,
          value: this.props.selectedPost.active,
          valid: true
        }
      };
      this.setState({ postForm: postForm, formIsValid: true });
    }
  }

  postInputChangeHandler = (input, value, files) => {
    if (files) {
      generateBase64FromImage(files[0])
        .then(b64 => {
          this.setState({ imagePreview: b64 });
        })
        .catch(e => {
          this.setState({ imagePreview: null });
        });
    }
    this.setState(prevState => {
      let isValid = true;
      // for (const validator of prevState.postForm[input]) {
      //   isValid = isValid && validator(value);
      // }
      const updatedForm = {
        ...prevState.postForm,
        [input]: {
          ...prevState.postForm[input],
          valid: isValid,
          value: files ? files[0] : value
        }
      };
      let formIsValid = true;
      for (const inputName in updatedForm) {
        formIsValid = formIsValid && updatedForm[inputName].valid;
      }
      return {
        postForm: updatedForm,
        formIsValid: formIsValid
      };
    });
  };

  inputBlurHandler = input => {
    this.setState(prevState => {
      return {
        postForm: {
          ...prevState.postForm,
          [input]: {
            ...prevState.postForm[input],
            touched: true
          }
        }
      };
    });
  };

  cancelPostChangeHandler = () => {
    this.setState({
      postForm: POST_FORM,
      // formIsValid: false
    });
    this.props.onCancelEdit();
  };

  acceptPostChangeHandler = () => {
    const post = {
      title: this.state.postForm.title.value,
      image: this.state.postForm.image.value,
      content: this.state.postForm.content.value,
      category: this.state.postForm.category.value,
      active: this.state.postForm.active.value
    };
    this.props.onFinishEdit(post);
    this.setState({
      postForm: POST_FORM,
      // formIsValid: false,
      imagePreview: null
    });
  };

  render() {
    return this.props.editing ? (
      <Fragment>
        <Backdrop onClick={this.cancelPostChangeHandler} />
        <Modal
          title="New Post"
          acceptEnabled={this.state.formIsValid}
          onCancelModal={this.cancelPostChangeHandler}
          onAcceptModal={this.acceptPostChangeHandler}
          isLoading={this.props.loading}
        >
          <form>
          <Input
              id="active"
              label="Active"
              control="input"
              onChange={this.postInputChangeHandler}
              onBlur={this.inputBlurHandler.bind(this, 'active')}
              valid={this.state.postForm['active'].valid}
              touched={this.state.postForm['active'].touched}
              value={this.state.postForm['active'].value}
            />
            <Input
              id="title"
              label="Title"
              control="input"
              onChange={this.postInputChangeHandler}
              onBlur={this.inputBlurHandler.bind(this, 'title')}
              valid={this.state.postForm['title'].valid}
              touched={this.state.postForm['title'].touched}
              value={this.state.postForm['title'].value}
            />
            <FilePicker
              id="image"
              label="Image"
              control="input"
              onChange={this.postInputChangeHandler}
              onBlur={this.inputBlurHandler.bind(this, 'image')}
              valid={this.state.postForm['image'].valid}
              touched={this.state.postForm['image'].touched}
            />
            <div className="new-post__preview-image">
              {!this.state.imagePreview && <p>Please choose an image.</p>}
              {this.state.imagePreview && (
                <Image imageUrl={this.state.imagePreview} contain left />
              )}
            </div>
            <Input
              id="content"
              label="Content"
              control="textarea"
              rows="5"
              onChange={this.postInputChangeHandler}
              onBlur={this.inputBlurHandler.bind(this, 'content')}
              valid={this.state.postForm['content'].valid}
              touched={this.state.postForm['content'].touched}
              value={this.state.postForm['content'].value}
            />
            <Input
              id="category"
              label="Category"
              control="input"
              onChange={this.postInputChangeHandler}
              onBlur={this.inputBlurHandler.bind(this, 'category')}
              valid={this.state.postForm['category'].valid}
              touched={this.state.postForm['category'].touched}
              value={this.state.postForm['category'].value}
            />
          </form>
        </Modal>
      </Fragment>
    ) : null;
  }
}

export default FeedEdit;
