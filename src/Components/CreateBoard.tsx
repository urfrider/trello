import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import styled from "styled-components";
import { FieldValues, useForm, UseFormSetFocus } from "react-hook-form";
import { toDoSelector } from "../atoms";
import { useRecoilState } from "recoil";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 300,
  bgcolor: "background.paper",
  border: "none",
  boxShadow: 24,
  backgroundColor: "#f1f2f6",
  borderRadius: 2,
  display: "flex",
  justifyContent: "center",
  flexDirection: "column",
  alignItems: "center",
  p: 4,
};

const Wrapper = styled.div``;

const closeBtnStyle = {
  position: "absolute",
  top: 5,
  right: 5,
};

const Form = styled.form`
  margin-top: 40px;
  display: flex;
  gap: 10px;
  input {
    width: 90%;
    height: 2rem;
    background-color: white;
    border: none;
    &:focus {
      outline: none;
    }
  }
  button {
    border-radius: 5px;
    background-color: #e84393;
    color: white;
    border: none;
    &:hover {
      background-color: #fd79a8;
    }
  }
`;

interface ICreateBoard {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

interface IForm {
  category: string;
  password: string;
}

export default function CreateBoard({ open, setOpen }: ICreateBoard) {
  const [toDos, setToDos] = useRecoilState(toDoSelector);
  const { register, setValue, handleSubmit, setFocus } = useForm<IForm>();
  const onClose = () => {
    setOpen(false);
  };
  const onValid = ({ category }: IForm) => {
    setToDos({ ...toDos, [category]: [] });
    setValue("category", "");
    setFocus("category");
  };

  return (
    <Wrapper>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={() => setOpen(false)}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <IconButton sx={closeBtnStyle} onClick={onClose}>
              <CloseIcon />
            </IconButton>
            <Typography id="transition-modal-title" variant="h6" component="h2">
              Create a category
            </Typography>
            <Form onSubmit={handleSubmit(onValid)}>
              <input
                {...register("category", { required: true })}
                type="text"
                placeholder="Enter a category"
              />
              <button>Create</button>
            </Form>
          </Box>
        </Fade>
      </Modal>
    </Wrapper>
  );
}
