import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { getReadingList, removeFromReadingList, addToReadingList } from '@tmo/books/data-access';
import { MatSnackBar } from '@angular/material/snack-bar';
import { finishedReadingList } from '../../../../data-access/src/lib/+state/reading-list.actions';
import { ReadingListItem } from '@tmo/shared/models';

@Component({
  selector: 'tmo-reading-list',
  templateUrl: './reading-list.component.html',
  styleUrls: ['./reading-list.component.scss']
})
export class ReadingListComponent {
  readingList$ = this.store.select(getReadingList);

  constructor(
    private readonly store: Store,
    private readonly snackBar: MatSnackBar
  ) {}

  removeFromReadingList(item) {
    this.store.dispatch(removeFromReadingList({ item }));
    let snackBarRef = this.snackBar.open(`Removed book ${item.title} from reading list.`, 'Undo',{duration: 5000});
    snackBarRef.onAction().subscribe(() => {
      let book = {
        ...item,
        id: item.BookId
      }
     this.store.dispatch(addToReadingList({ book }));
    });
  }

  finishFromReadingList(item: ReadingListItem) {
    let finishedItem: ReadingListItem = {
      ...item,
      finished: true,
      finishedDate: new Date().toISOString()
    };
    this.store.dispatch(finishedReadingList({ item: finishedItem }));
    this.snackBar.open(`Finished book ${item.title} in reading list.`, null,{duration: 5000});
  }
}
