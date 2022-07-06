export interface ISolutionChangeDialogProps {
  isOpen?: boolean
  onClose: () => void
  onApply: () => void
  message: string
  title: string
  cancelText: string
  applyText: string
}

export interface ISolutionChangeModalProps
  extends Omit<
    ISolutionChangeDialogProps,
    'message' | 'title' | 'cancelText' | 'applyText'
  > {
  solutionName?: string
  controlName: string
}
