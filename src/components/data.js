import React, { useEffect, useState } from "react";
import ListIcon from "@mui/icons-material/List";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFileOutlined";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownwardOutlined";
import styled from "styled-components";
import { db } from "./firebase";

const DataContainer = styled.div`
  flex: 1 1;
  padding: 10px 0px 0px 20px;
`;

const DataHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid lightgray;
  height: 40px;

  .headerleft {
    display: flex;
    align-items: center;
    font-size: 22px;
    font-family: "Helvetica Neue";
    color: black;
  }

  .headerright svg {
    margin: 0px 10px;
  }
`;

const DataGrid = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 30px;
  margin-top: 30px;
`;

const DataFile = styled.div`
  text-align: center;
  border: 1px solid rgb(204, 204, 204/46%);
  border-radius: 5px;
  margin: 10px;
  min-width: 200px;
  padding: 10px 0px 0px 0px;

  svg {
    font-size: 60px;
    color: gray;
  }

  p {
    border-top: 1px solid #ccc;
    margin-top: 5px;
    font-size: 12px;
    background: whitesmoke;
    padding: 10px 0px;
  }
`;

const DataListRow = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #ccc;
  padding: 10px;

  p {
    display: flex;
    align-items: center;
    font-size: 14px;
  }

  b {
    display: flex;
    align-items: center;
  }

  svg {
    font-size: 22px;
    margin: 10px;
  }
`;

const Data = () => {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    db.collection("myfiles").onSnapshot((snapshot) => {
      setFiles(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      );
    });
  }, []);

  const changeBytes = (bytes, decimals = 2) => {
    if (bytes === 0) return "0 bytes";
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
  };

  return (
    <DataContainer>
      <DataHeader>
        <div className="headerleft">
          <p>Welcome To Drive</p>
        </div>
        <div className="headerright">
          <ListIcon />
          <InfoOutlinedIcon />
        </div>
      </DataHeader>

      <div>
        <DataGrid>
          {files.map((file) => (
            <DataFile key={file.id}>
              <InsertDriveFileIcon />
              <p>{file.data.filename}</p>
            </DataFile>
          ))}
        </DataGrid>
      </div>

      <DataListRow>
        <p>
          <b>
            Name <ArrowDownwardIcon />
          </b>
        </p>
        <p>
          <b>Last Modified</b>
        </p>
        <p>
          <b>File Size</b>
        </p>
      </DataListRow>

      {files.map((file) => (
        <DataListRow key={file.id}>
          <a href={file.data.fileURL} target="_blank">
            <p>
              <InsertDriveFileIcon />
              {file.data.filename}
            </p>
          </a>
          <p>{new Date(file.data.timestamp.seconds * 1000).toUTCString()}</p>
          <p>{changeBytes(file.data.size)}</p>
        </DataListRow>
      ))}
    </DataContainer>
  );
};

export default Data;
