import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import { v4 as uuidv4 } from 'uuid';
import { useState } from 'react'

const backLogs = [
  { id: uuidv4(), content: '1st Task' },
  { id: uuidv4(), content: '2nd Task' }
]

const toDos = [
  { id: uuidv4(), content: '1st ToDo'}
]
const columnsFromBack = {
  [uuidv4()]: {
    name: 'Backlogs',
    items: backLogs
  },
  [uuidv4()]: {
    name: 'ToDos',
    items: toDos
  },
  [uuidv4()]: {
    name: 'InProgress',
    items: []
  },
  [uuidv4()]: {
    name: 'Designed',
    items: []
  },
}

const onDragEnd = (result, columns, setColumns) => {
  if(!result.destination) return
  const { source, destination } = result
  if(source.destination !== destination.droppableId){
    const sourceColumn = columns[source.droppableId]
    const destinationColumn = columns[destination.droppableId]
    const sourceItems = [...sourceColumn.items]
    const destinationItems = [...destinationColumn.items]
    const [removed] = sourceItems.splice(source.index, 1)
    destinationItems.splice(destination.index, 0, removed)
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...sourceColumn, 
        items: sourceItems
      },
      [destination.droppableId]: {
        ...destinationColumn,
        items: destinationItems
      }
    })
  } else {
    const column = columns[source.droppableId]
    const copiedItems = [...column.items]
    const [removed] = copiedItems.splice(source.index, 1)
    copiedItems.splice(destination.index, 0, removed )
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...column,
        items: copiedItems
      }
     })
  }
}

function App() {
  const [columns, setColumns] = useState(columnsFromBack)
  return (
    <div style={{display:'flex', justifyContent:'center', height:'100%'}}>
      <DragDropContext onDragEnd={result => onDragEnd(result, columns, setColumns)}>
        {Object.entries(columns).map(([id, column]) =>{
          return (
            <div key={id} style={{display: 'flex', flexDirection:'column', alignItems:'center'}}>
              <h2>{column.name}</h2>
              <div key={id} style={{margin: 8}}>
                <Droppable droppableId={id} key={id}>
                  {(provided, snapshot) => {
                    return (
                      <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        style={{
                          background: snapshot.isDraggingOver ? 'lightblue' : 'lightgrey',
                          padding: 4,
                          width: 250,
                          minHeight: 500,
                          margin: 'auto'
                        }}
                      >
                        {provided.placeholder}
                        {column.items.map((item, index) => {
                          return (
                            <Draggable key={item.id} draggableId={item.id} index={index}>
                              {(provided, snapshot) => {
                                return (
                                  <div 
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    style={{
                                      userSelect:'none',
                                      padding: 16,
                                      margin: '0 0 8px 0',
                                      minHeight: '50',
                                      backgroundColor: snapshot.isDragging ? '#263B4A' : '#456C86',
                                      color: 'White',
                                      ...provided.draggableProps.style
                                    }}  
                                  >
                                    {item.content}
                                  </div>
                                )
                              }}
                            </Draggable>
                          )
                        })}
                      </div>
                    )
                  }}
                </Droppable>
              </div>
            </div>
          )
        })}
      </DragDropContext>
    </div>
  );
}

export default App;
