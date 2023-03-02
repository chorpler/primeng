import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CalendarDemo } from './calendardemo';
import { CalendarDemoRoutingModule } from './calendardemo-routing.module';
import { CalendarModule } from '../../../components/calendar/calendar';
import { TabViewModule } from '../../../components/tabview/tabview';
import { CodeHighlighterModule } from '../../../components/codehighlighter/codehighlighter';
import { DirectivesModule } from '../../../directives/directives.module';

@NgModule({
	imports: [
		CommonModule,
    FormsModule,
    DirectivesModule,
		CalendarDemoRoutingModule,
    CalendarModule,
    TabViewModule,
    CodeHighlighterModule
	],
	declarations: [
		CalendarDemo
	]
})
export class CalendarDemoModule {}
