import { ColumnType } from "../../models/models";

/**
 * Reorder
 */
export const reorder = (list: any[], startIndex: number, endIndex: number) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
};

/**
 * Reorder single drag
 */
export const reorderSingleDrag = (args: { 
    entities: ColumnType[]; 
    selectedTaskIds: any; 
    source: any; 
    destination: any; 
}) => {
    const {
        entities,
        source,
        destination
    } = args
    // moving in the same list
    if (source.droppableId === destination.droppableId) {
        const column = entities.find(i => i.id === source.droppableId);
        if (!column) return 

        const reorderedTasks = reorder(column.tasks, source.index, destination.index);

        return {
            entities: reorderedTasks,
            columnId: destination.droppableId
        };
    }
};
