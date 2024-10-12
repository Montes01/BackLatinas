import { Comment as type } from "../../../lib/types/types"
import { StarRate } from "../StarRate/StarRate";
import { UserIcon } from "../UserIcon/userIcon";
import styles from './comment.module.scss';
import React, { Component, useState, useEffect } from 'react';
import axios from 'axios';


// Componente ErrorBoundary como clase
class ErrorBoundary extends Component<{ children: React.ReactNode }, { hasError: boolean }> {
    constructor(props: { children: React.ReactNode }) {
      super(props);
      this.state = { hasError: false };
    }
  
    // Método para capturar errores
    static getDerivedStateFromError() {
      return { hasError: true };
    }
  
    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
      console.error("Error caught by ErrorBoundary: ", error, errorInfo);
    }
  
    render() {
      if (this.state.hasError) {
        return <h1>Something went wrong.</h1>;
      }
      return this.props.children;
    }
  }
  
  export const Comment = () => {
    const [comments, setComments] = useState<type[]>([]);
    const [imageError, setImageError] = useState<{ [key: number]: boolean }>({});
  
    const handleImageError = (id: number) => {
      setImageError((prev) => ({ ...prev, [id]: true }));
    };
  
    useEffect(() => {
      const fetchComments = async () => {
        try {
          const response = await axios.get('https://backlatinassexcam.onrender.com/LatinasSexCam/comments');
          console.log(response.data); // Verificar la estructura de los datos de respuesta
          setComments(response.data);
        } catch (error) {
          console.error("Error fetching comments: ", error);
        }
      };
  
      fetchComments();
    }, []);
  
    return (
      <ErrorBoundary>
        {comments.map((comment) => (
          <article key={comment.id} className={styles.comment_wrapper}>
            <div className={styles.comment_wrapper__avatar}>
              {imageError[comment.id] || !comment.user ? (
                <UserIcon className={styles.comment_wrapper__avatar__image} />
              ) : (
                <img
                  onError={() => handleImageError(comment.id)}
                  src={comment.user.profile_photo}
                  alt="avatar"
                  className={styles.comment_wrapper__avatar__image}
                />
              )}
            </div>
            <section className={styles.comment_wrapper__text}>
              <h3 className={styles.comment_wrapper__text__name}>{comment.user?.user_name || 'Anonymous'}</h3>
              <p className={styles.comment_wrapper__text__comment}>{comment.comment}</p>
            </section>
            <div className={styles.comment_wrapper__rate}>
              {new Array(comment.stars).fill(undefined).map((_, starIndex) => (
                <StarRate key={`Star-${starIndex}`} />
              ))}
            </div>
          </article>
        ))}
      </ErrorBoundary>
    );
  };