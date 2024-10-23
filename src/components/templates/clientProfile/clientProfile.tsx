import React, { useEffect, useState, useRef } from "react";
import { Header } from "../../molecules/Header/header";
import styles from "./clientProfile.module.scss";
import { Button } from "../../atoms/Button/button";
import { Footer } from "../../molecules/Footer/footer";
import Webcam from "react-webcam";
import { Camera, Edit } from "@mui/icons-material";
import { BackButton } from "../../molecules/BackButton/backButton";
import { Comment as CommentRender } from "../../atoms/Comment/comment";
import { useAppSelector } from "../../../lib/contexts/hooks";
import { Comment, UserInfoResponse } from "../../../lib/types/types";
import { getComments, getUserInfo } from "../../../lib/services/api";

export const ClientProfile = () => {
  const [comments, setComments] = useState<Array<Comment>>([]);
  const [showWebcam, setShowWebcam] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);
  const [userInfo, setUserInfo] = useState(null as UserInfoResponse | null);
  const webcamRef = useRef<Webcam>(null);
  const user = useAppSelector((state) => state.auth.user);
  const [reloadComments, setReloadComments] = useState(false);
  useEffect(() => {
    try {
      getComments().then((response) => {
        setComments(response);
      });
    } catch (error) {
      setComments([]);
      console.error("Error al obtener los comentarios:", error);
    }
  }, [reloadComments]);

  useEffect(() => {
    if (user) {
      getUserInfo(user.sub).then((response) => {
        setUserInfo(response);
      });
    }
  }, [user]);


  const filteredComments = comments.filter((comment) => comment.userName === userInfo?.userName);

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
          {
            filteredComments.map((comment) => (
              <CommentRender reload={() => setReloadComments(!reloadComments)} comment={comment} canEdit />
            ))
          }
        </div>
        <Footer />
      </main>
    </>
  );
};
