import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "./ui/alert-dialog"

interface PageProps {
      title: string,
    selectedId: number,
    modelOpen: boolean,
    modelClose: (open: boolean) =>void,
    confirmDelete: (id: number) => void 
}

const DeleteModel = ({   title ,selectedId, confirmDelete, modelClose, modelOpen } : PageProps) => {
  return (
    <AlertDialog open={modelOpen} onOpenChange={modelClose}>
        <AlertDialogContent>
            <AlertDialogHeader>
            <AlertDialogTitle>{  title ?? "N/A"}</AlertDialogTitle>
            <AlertDialogDescription>
                Are your sure, You want continue the process?
            </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
            <AlertDialogCancel size={'default'} variant={'outline'} className={'cursor-pointer'}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={()=>confirmDelete(selectedId)}>Delete</AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
        </AlertDialog>
  )
}

export default DeleteModel
