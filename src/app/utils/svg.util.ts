import { MatIconRegistry } from '@angular/material'
import { DomSanitizer } from '@angular/platform-browser'

export const loadSvgResources = (ir:MatIconRegistry,ds:DomSanitizer) =>{
    const imgDir = 'assets/img'
    const sidebarDir = `${imgDir}/sidebar`
    const dayDir = `${imgDir}/days`
    const avatar = `${imgDir}/avatar`

    ir.addSvgIcon('gift', ds.bypassSecurityTrustResourceUrl('assets/gifts.svg'))
    ir.addSvgIcon('day', ds.bypassSecurityTrustResourceUrl(`${sidebarDir}/day.svg`))
    ir.addSvgIcon('month', ds.bypassSecurityTrustResourceUrl(`${sidebarDir}/month.svg`))
    ir.addSvgIcon('project', ds.bypassSecurityTrustResourceUrl(`${sidebarDir}/project.svg`))
    ir.addSvgIcon('projects', ds.bypassSecurityTrustResourceUrl(`${sidebarDir}/projects.svg`))
    ir.addSvgIcon('week', ds.bypassSecurityTrustResourceUrl(`${sidebarDir}/week.svg`))

    ir.addSvgIconSetInNamespace('avatars', ds.bypassSecurityTrustResourceUrl(`${avatar}/avatars.svg`))
    

    for(let i=1;i<=31;i++){
        ir.addSvgIcon(`day${i}`, ds.bypassSecurityTrustResourceUrl(`${dayDir}/day${i}.svg`))
    }
}