import { t, TI18nKey } from '@i18n'
import { Popover } from '@ui/popover'
import { IPopoverBaseProps } from '@ui/popover/popover.interface'
import { DatasetInfoDataCy } from '@components/data-testid/dataset-info.cy'
import { PopperMenu } from '@components/popper-menu/popper-menu'
import { PopperMenuItem } from '@components/popper-menu/popper-menu-item'
import { GlbPagesNames } from '@glb/glb-names'
import { popoverOffset } from '@pages/ws/constants'
interface IOpenViewerPopoverProps extends IPopoverBaseProps {
  pages: string[]
  goToPage: (name: GlbPagesNames) => void
}

export const OpenViewerPopover = ({
  pages,
  anchorEl,
  isOpen,
  goToPage,
  onClose,
}: IOpenViewerPopoverProps) => (
  <Popover
    onClose={onClose}
    isOpen={isOpen}
    anchorEl={anchorEl}
    offset={popoverOffset}
    placement="bottom"
  >
    <PopperMenu close={close}>
      {pages.map((pageName, index) => {
        const shouldRenderOption = pageName !== GlbPagesNames.IGV

        if (!shouldRenderOption) return

        return (
          <PopperMenuItem
            key={index}
            data-testid={DatasetInfoDataCy.viewerOption}
            onClick={() => goToPage(pageName as GlbPagesNames)}
            className="first:rounded-t last:rounded-b"
          >
            {t(`home.${pageName}` as TI18nKey)}
          </PopperMenuItem>
        )
      })}
    </PopperMenu>
  </Popover>
)
