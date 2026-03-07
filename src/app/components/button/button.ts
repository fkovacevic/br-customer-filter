import { Component, Input, Output, EventEmitter } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NgIconsModule } from "@ng-icons/core";

type RegularButtonProps = {
  type: "primary" | "secondary" | "danger";
  label: string;
};

type IconButtonProps = {
  type: "icon";
  iconName: string;
};

export type ButtonProps = RegularButtonProps | IconButtonProps;

@Component({
  selector: "app-button",
  standalone: true,
  imports: [CommonModule, NgIconsModule],
  templateUrl: "./button.html",
  styleUrl: "./button.scss",
})
export class Button {
  @Input() type: ButtonProps["type"] = "primary";
  @Input() label = "";
  @Input() iconName = "";
  @Output() onClick = new EventEmitter<void>();
}
