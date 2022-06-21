import { Component, OnInit, forwardRef, Input, OnDestroy } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Subject } from 'rxjs';
import { UploadService } from 'src/app/services/upload/upload-file.service';
import * as CKEditor from '../build-full-feature/build/ckeditor';
import { UploadAdapter } from './editor.adapter';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => EditorComponent),
      multi: true
    }
  ]
})

export class EditorComponent implements OnInit, ControlValueAccessor, OnDestroy {

  unsubscribe$: Subject<void> = new Subject();
  config:any;
  public Editor = CKEditor;

  @Input() readonly: boolean = false;
  @Input() toolbar:any = defaultToolbar;

  private _value: string = '';

  get value() {
    return this._value;
  }

  set value(v: string) {
    if (v !== this._value) {
      this._value = v;
      this.onChange(v);
    }
  }

  constructor(private uploadService:UploadService) { }
  onChange(_:any) {}
  onTouch() { }

  writeValue(obj: any): void {
    this._value = obj;

  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }


  ngOnInit(): void {
    this.config = {
		...defaultConfig,
		toolbar: this.toolbar
	}
	console.log(this.config)
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }


  title = 'ckeditor5';

  onReady($event: any) {
    $event.plugins.get('FileRepository').createUploadAdapter = (loader:any)=> {
      return new UploadAdapter(loader, this.uploadService);
    };
  }

}

const defaultToolbar = {
	items: [
		'heading',
		'|',
		'fontSize',
		'fontColor',
		'fontFamily',
		'|',
		'bold',
		'italic',
		'strikethrough',
		'underline',
		'superscript',
		'subscript',
		'specialCharacters',
		'highlight',
		'removeFormat',
		'|',
		'codeBlock',
		'code',
		'htmlEmbed',
		'blockQuote',
		'|',
		'bulletedList',
		'numberedList',
		'todoList',
		'|',
		'alignment',
		'outdent',
		'indent',
		'horizontalLine',
		'pageBreak',
		'|',
		'-',
		'link',
		'imageUpload',
		'insertTable',
		'mediaEmbed',
		'|',
		'-',
		'sourceEditing',
		'restrictedEditingException',
		'findAndReplace',
		'textPartLanguage',
		'-',
		'undo',
		'redo'
	],
	shouldNotGroupWhenFull: true
}

const defaultConfig = {
	toolbar: {},
	language: 'en',
	image: {
		toolbar: [
			'imageTextAlternative',
			'imageStyle:inline',
			'imageStyle:block',
			'imageStyle:side'
		]
	},
	table: {
		contentToolbar: [
			'tableColumn',
			'tableRow',
			'mergeTableCells',
			'tableCellProperties',
			'tableProperties'
		]
	},
	heading: {
		options: [
		{ model: 'paragraph', title: 'Paragraph', class: 'ck-heading_paragraph' },
		{ model: 'heading1', view: 'h1', title: 'Heading 1', class: 'ck-heading_heading1' },
		{ model: 'heading2', view: 'h2', title: 'Heading 2', class: 'ck-heading_heading2' },
		{ model: 'heading3', view: 'h3', title: 'Heading 3', class: 'ck-heading_heading3' }
		]
	}
};
