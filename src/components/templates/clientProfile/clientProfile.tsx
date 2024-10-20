import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Header } from "../../molecules/Header/header";
import styles from "./clientProfile.module.scss";
import { Button } from "../../atoms/Button/button";
import { Footer } from "../../molecules/Footer/footer";
import Webcam from "react-webcam";
import { Camera, Edit, ArrowBack, ArrowForward } from "@mui/icons-material";
import { BackButton } from "../../molecules/BackButton/backButton";
import { Comment as CommentRender } from "../../atoms/Comment/comment";
import { useAppSelector } from "../../../lib/contexts/hooks";
import { Comment } from "../../../lib/types/types";

export const ClientProfile = () => {
  const [comments, setComments] = useState<Array<Comment>>([]);
  const [showWebcam, setShowWebcam] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);
  const webcamRef = useRef<Webcam>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const commentsPerPage = 4;
  const user = useAppSelector((state) => state.auth.user);
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
        <BackButton />
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
              <h2 className={styles.username}>{user?.nombre}</h2>
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
              <Button text="Capture Photo" onClick={handleCaptureImage} />
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
          {currentComments.map((comment) => (
            <CommentRender comment={comment} canEdit />
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
                  className={`${styles.pageButton} ${currentPage === number ? styles.activePage : ''
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
