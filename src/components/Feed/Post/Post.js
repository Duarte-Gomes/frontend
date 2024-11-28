import React from 'react';
import Image from '../../../components/Image/Image';

import Button from '../../Button/Button';
import './Post.css';

function post(props) {
    const teste = "http://localhost:8080/"+ props.image;

    
    return (
        <article className="post">
            <header className="post__header">
                <h3 className="post__meta">
                    Categoria: {props.category}
                </h3>
                <h1 className="post__title">{props.title}</h1>
            </header>
            <div className="post__image">
              <Image imageUrl= {teste} contain />
            </div>
            {/* <div className="post__content">{props.content}</div> */}
            <div className="post__actions">
                <Button mode="flat" link={props.id}>
                    View
                </Button>
                <Button mode="flat" onClick={props.onStartEdit}>
                    Edit
                </Button>
                <Button mode="flat" design="danger" onClick={props.onDelete}>
                    Delete
                </Button>
            </div>
        </article>
    );
}

export default post;
