export interface IConfirmDialogProps {
  isOpen?: boolean
  onClose: () => void
  onApply: () => void
  message: string
  title: string
  cancelText: string
  applyText: string
}

export interface IConfirmModalProps
  extends Omit<
    IConfirmDialogProps,
    'message' | 'title' | 'cancelText' | 'applyText'
  > {
  solutionName?: string
  controlName: string
}
