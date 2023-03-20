import React, { useState, useEffect } from "react";

import { Close } from "@mui/icons-material";
import {
	IconButton,
	List,
	ListItem,
	TextField,
	ListItemAvatar,
	ListItemText,
	Checkbox,
	FormControlLabel,
} from "@mui/material";

import { useSnackbar } from "notistack";

import Card from "components/Card";
import Layout from "components/Layout";

import { useTodoApi } from "api/todo";
import useCatchError from "api/useCatchError";

import Filter from "./Filter";
import Header from "scenes/Header";

export default function Todo() {
	const { find, create, update, remove } = useTodoApi();
	const catchError = useCatchError();
	const { enqueueSnackbar } = useSnackbar();

	const [todoText, setTodoText] = useState();
	const [todoList, setTodoList] = useState([]);
	const [selection, setSelection] = useState("All");

	useEffect(() => {
		find().then((res) => {
			setTodoList(res ?? []);
		});
	}, []);

	const handleCreate = () => {
		if (!todoText) {
			enqueueSnackbar("Title of the todo can not be empty.");
			return;
		}

		create(todoText)
			.then((res) => {
				setTodoList([...(todoList ?? []), res]);
				setTodoText("");
			})
			.catch(catchError);
	};

	const handleRemove = (id) => {
		remove(id)
			.then(() => {
				setTodoList(todoList.filter((el) => el.id !== id));
			})
			.catch(catchError);
	};

	const handleUpdate = (id, isCompleted) => {
		update(id, isCompleted)
			.then((_) => {
				setTodoList(todoList.map((el) => (el.id === id ? { ...el, isCompleted } : el)));
			})
			.catch(catchError);
	};

	const handleFind = (select) => {
    if(select === selection) {
      return;
    }

		const filterMap = {
			All: undefined,
			Completed: { isCompleted: true },
			Incompleted: { isCompleted: false },
		};

		find(filterMap[select])
			.then((res) => {
				setTodoList(res);

        setSelection(select);
			})
			.catch(catchError);
	};

	return (
		<Layout>
      <Header />
			<Card
				title="Todo List"
				content={
					<div style={{ marginTop: "18px" }}>
						<TextField
							label="Add a new todo"
							fullWidth
							variant="standard"
							value={todoText}
							type="email"
							InputLabelProps={{
								style: { color: "#a1a4ad" },
							}}
							onChange={(e) => setTodoText(e.target.value)}
							onKeyPress={(e) => {
								if (e.key === "Enter") {
									handleCreate();
								}
							}}
						/>
						<List>
							{todoList?.map((item, ix) => (
								<ListItem
									sx={{ paddingLeft: 0 }}
									key={ix}
									secondaryAction={
										<IconButton
											edge="end"
											aria-label="delete"
											onClick={() => handleRemove(item.id)}
										>
											<Close />
										</IconButton>
									}
								>
									<ListItemAvatar>
										<FormControlLabel
											control={
												<Checkbox
													checked={item.isCompleted}
													onChange={(e) => {
														handleUpdate(item.id, e.target.checked);
													}}
												/>
											}
										/>
									</ListItemAvatar>
									<ListItemText primary={item.title} />
								</ListItem>
							))}
						</List>
					</div>
				}
				actions={<Filter selection={selection} onClick={(select) => handleFind(select)} />}
			></Card>
		</Layout>
	);
}
