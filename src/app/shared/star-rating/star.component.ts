import { Component, OnChanges, Input, Output, EventEmitter } from "@angular/core";


@Component({
    selector: 'pm-star',
    templateUrl: './star.component.html',
    styleUrls: ['./star.component.css']
})
export class StarComponent implements OnChanges{
    @Input() rating: number;
    starWidth: number;

    // Convert rating number to starWidth
    ngOnChanges(): void {
        this.starWidth = this.rating * 75 /5;        
    }

    // Output
    @Output() notify: EventEmitter<string> = new EventEmitter<string>();

    onClick(): void{
        this.notify.emit("click!!!");
    }
}