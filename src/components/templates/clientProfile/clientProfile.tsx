import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Header } from "../../molecules/Header/header";
import styles from "./clientProfile.module.scss";
import { Button } from "../../atoms/Button/button";
import { Footer } from "../../molecules/Footer/footer";
import Webcam from "react-webcam";
import { Arrow } from "../../atoms/Arrow/arrow"
import { Camera, Star, Edit, Delete, ArrowBack, ArrowForward } from "@mui/icons-material";

export const ClientProfile = () => {
  const [girlImages, setGirlImages] = useState<Array<string>>([]);
  const [services, setServices] = useState<Array<Service>>([]);
  const [comments, setComments] = useState<Array<Comment>>([]);
  const [showWebcam, setShowWebcam] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);
  const webcamRef = useRef<Webcam>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const commentsPerPage = 4;

  // Obtener comentarios
  const fetchComments = async () => {
    try {
      const response = await axios.get(
        "https://backlatinassexcam.onrender.com/LatinasSexCam/comments"
      );
      setComments(response.data);
    } catch (error) {
      console.error("Error al obtener los comentarios:", error);
    }
  };

  // Editar comentario
  const handleEditComment = async (id: number, updatedText: string) => {
    try {
      await axios.put(
        `https://backlatinassexcam.onrender.com/LatinasSexCam/editComment/2${id}`,
        {
          text: updatedText,
        }
      );
      console.log(`Comentario ${id} editado con éxito`);
      fetchComments(); // Actualiza los comentarios después de editar
    } catch (error) {
      console.error("Error al editar el comentario:", error);
    }
  };

  // Borrar comentario
  const handleDeleteComment = async (id: number) => {
    try {
      await axios.delete(
        `https://backlatinassexcam.onrender.com/LatinasSexCam/deleteComment/2${id}`
      );
      console.log(`Comentario ${id} eliminado con éxito`);
      fetchComments(); // Actualiza los comentarios después de eliminar
    } catch (error) {
      console.error("Error al eliminar el comentario:", error);
    }
  };

  useEffect(() => {
    fetchComments();
  }, []);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUploadedImage(e.target.files[0]);
    }
  };

  const handleCaptureImage = () => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      console.log("Captured image:", imageSrc);
      setShowWebcam(false);
    }
  };

  const indexOfLastComment = currentPage * commentsPerPage;
  const indexOfFirstComment = indexOfLastComment - commentsPerPage;
  const currentComments = comments.slice(indexOfFirstComment, indexOfLastComment);
  const totalPages = Math.ceil(comments.length / commentsPerPage);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <Header />
      <main className={styles.main}>
      <div className={styles.girlBase__backContainer}>
                        <Arrow className={styles.girlBase__backContainer__arrow}/>
                        <Button text="Back" className={styles.girlBase__backContainer__back} onClick={() => navigate(-1)} />   {/* el boton de back ya retrocede a la pagina anterios */}
                    </div>
        <div className={styles.profileContainer}>
          <div className={styles.profileHeader}>
            <div className={styles.photoContainer}>
              <div className={styles.photoPlaceholder}>
                <Camera className={styles.cameraIcon} />
                <input
                  type="file"
                  accept="image/*"
                  className={styles.fileInput}
                  onChange={handleImageUpload}
                />
              </div>
              <button
                className={styles.webcamButton}
                onClick={() => setShowWebcam(!showWebcam)}
              >
                <Camera className={styles.webcamIcon} />
              </button>
            </div>
            <div className={styles.userInfo}>
              <h2 className={styles.username}>User92771</h2>
              <p className={styles.userDescription}>Norwegian Man</p>
            </div>
            <button className={styles.editButton}>
              <Edit className={styles.editIcon} />
            </button>
          </div>

          {showWebcam && (
            <div className={styles.webcamContainer}>
              <Webcam
                audio={false}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                width="100%"
              />
              <Button onClick={handleCaptureImage}>Capture Photo</Button>
            </div>
          )}

          {uploadedImage && (
            <div className={styles.uploadedImageContainer}>
              <img
                src={URL.createObjectURL(uploadedImage)}
                alt="Uploaded"
                className={styles.uploadedImage}
              />
            </div>
          )}

          <h3 className={styles.commentsHeader}>Your Comments</h3>
          {currentComments.map((comment, index) => (
  <div key={index} className={styles.commentBox}>
    <div className={styles.commentHeader}>
      <div className={styles.userInfo}>
        <div className={styles.userAvatar}></div>
        <span className={styles.username}>User92771</span>
      </div>
      <div className={styles.starRating}>
        {[...Array(5)].map((_, i) => (
          <Star key={i} className={styles.starIcon} />
        ))}
      </div>
    </div>
    <p className={styles.commentText}>{comment.text}</p>
    <div className={styles.commentFooter}>
      <span className={styles.commentDate}>
        Publicado el {new Date(comment.createdAt).toLocaleString('es-ES', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        })}
      </span>
      <div className={styles.commentActions}>
        <button
          className={styles.editButton}
          onClick={() => handleEditComment(comment.id, comment.text)}
        >
          <Edit className={styles.editIcon} />
        </button>
        <button
          className={styles.deleteButton}
          onClick={() => handleDeleteComment(comment.id)}
        >
          <Delete className={styles.deleteIcon} />
        </button>
      </div>
    </div>
  </div>
))}


          {comments.length > commentsPerPage && (
            <div className={styles.pagination}>
              <button
                className={`${styles.paginationButton} ${currentPage === 1 ? styles.disabled : ''}`}
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                <ArrowBack className={styles.arrowIcon} />
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
                <button
                  key={number}
                  className={`${styles.pageButton} ${
                    currentPage === number ? styles.activePage : ''
                  }`}
                  onClick={() => handlePageChange(number)}
                >
                  {number}
                </button>
              ))}

              <button
                className={`${styles.paginationButton} ${currentPage === totalPages ? styles.disabled : ''}`}
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                <ArrowForward className={styles.arrowIcon} />
              </button>
            </div>
          )}
        </div>
        <Footer />
      </main>
    </>
  );
};
