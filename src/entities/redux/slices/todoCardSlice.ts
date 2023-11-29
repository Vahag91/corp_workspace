
import { createSlice, PayloadAction } from "@reduxjs/toolkit";


export interface CardType {
    id: string;
    content: string;
}

export interface ColumnType {
    id: string;
    title: string;
    cards: CardType[];
}

interface TodoState {
    columns: ColumnType[];
}

const initialState: TodoState = {
    columns: [
        {
            id: 'col-1',
            title: 'ToDo',
            cards: [{ id: 'c-1', content: 'Task 1' }],
        },
    ]
}

const todoSlice = createSlice({
    name: "todo",
    initialState,
    reducers: {
        setColumn: (state, action: PayloadAction<ColumnType>) => {
            return {
                ...state,
                columns: [...state.columns, action.payload],
            }
        },
        setCard: (state, action: PayloadAction<{ columnId: string; card: CardType }>) => {
            const { columnId, card } = action.payload;
            const columnIndex = state.columns.findIndex(column => column.id === columnId);

            if (columnIndex !== -1) {

                state.columns[columnIndex] = {
                    ...state.columns[columnIndex],
                    cards: [...state.columns[columnIndex].cards, card],
                };
            }

            return state;
        }
    }
});
export const { setColumn, setCard } = todoSlice.actions;
export default todoSlice.reducer;