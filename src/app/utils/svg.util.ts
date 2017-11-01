import { MdIconRegistry } from '@angular/material'
import { DomSanitizer } from '@angular/platform-browser'

export const loadSvgResources = (ir:MdIconRegistry,ds:DomSanitizer) => {
    ir.addSvgIcon('gift',ds.bypassSecurityTrustResourceUrl('assets/gift.svg'))//使用外部的svg
}