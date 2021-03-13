import { Component, OnInit } from '@angular/core';
import { HighlightResult } from 'ngx-highlightjs';

@Component({
  selector: 'app-java-reg-exp',
  templateUrl: './java-reg-exp.component.html',
  styleUrls: ['./java-reg-exp.component.css']
})
export class JavaRegExpComponent implements OnInit {

  response: HighlightResult;

  lang = ["java"];

  part1 = `//regular expressions are a sequence of characters that define a search pattern
		
  String string = "I am a string";
  System.out.println(string);

  //the regular expressions are the first parameter, for example, of replaceAll
  //replacements need not match the length of the regular expression
  String yourString = string.replaceAll("I", "You");
  System.out.println(yourString);
  
  String alphanumeric = "abcdefghijk";
  //look for b AND c AND d, in the given order
  System.out.println(alphanumeric.replaceAll("bcd", "y"));
  //missing d in between c and e, so false
  System.out.println(alphanumeric.replaceAll("bce", "y"));
  System.out.println(alphanumeric.replaceAll("dbc", "y"));
  System.out.println(alphanumeric.replaceAll(".", "y"));
  
  //^matches at the start of the string
  System.out.println(alphanumeric.replaceAll("^abc", "yyyyyy"));
  
  String secondString = "abcdefghijkabcdefghijk";
  System.out.println(alphanumeric.replaceAll("^abc", "xxxxxxxxxx"));
  //no match, so no replacement
  System.out.println(alphanumeric.replaceAll("^143", "yyyyyy"));
  
  //does the regular expression match?
  System.out.println(alphanumeric.matches("^abc"));
  //it doesn't...the regexp needs to match the entire string, we'd need to write ^abcdefghijk
  System.out.println(alphanumeric.matches("^abcdefghijk"));
  //quite useful when checking for critical input (password checking etc)
  
  //the caret signifies the beginning, the dollar sign signifies the end
  System.out.println(alphanumeric.replaceAll("ghijk$", "theDudeIsBack"));
  
  //[] focuses on a specific set of characters
  System.out.println(secondString.replaceAll("[de]", "DEDE"));
  
  //focus on a set only if it is followed by the second set
  String thirdString = "abcdeFGhijkabcdefghijk";
  System.out.println(thirdString.replaceAll("[de][FG]", "DEDE"));`;

  part2 = `//this checks for upper or lower case H
  System.out.println("Harry".replaceAll("[Hh]arry", "Harry"));

  String thirdString = "abcdEfghijk999888777abcdefghijk";
  //replace all except for lowercase e; the caret is inside the brackets
  System.out.println(thirdString.replaceAll("[^ej]", "X"));
  
  //the order in which the literals appear in the brackets matters not
  System.out.println(thirdString.replaceAll("[dcba]", "X"));
  System.out.println(thirdString.replaceAll("[abcdef345678]", "X"));
  
  //shortcut to ranges (java increments automatically,
  // a-e and 3-8 (no need to separate with a comma or hyphen)
  System.out.println(thirdString.replaceAll("[a-e3-8]", "X"));
  System.out.println(thirdString.replaceAll("[A-Z]", "X"));
  
  //ignore case with (?iu) (i for ASCII and u for unicode)
  System.out.println(thirdString.replaceAll("(?i)[a-e3-8]", "X"));
  System.out.println(thirdString.replaceAll("(?u)[a-e3-8]", "X"));
  System.out.println(thirdString.replaceAll("(?ui)[a-e3-8]", "X"));
  
  //match all numerical digits
  System.out.println(thirdString.replaceAll("\\d", "X"));
  
  //match all non-numerical digits
  System.out.println(thirdString.replaceAll("\\D", "X"));
  
  String hasWhiteSpace = "I have blanks and\\t a newline\\nDude!___but_not_here";
  System.out.println(hasWhiteSpace);
  //finds all whitespace (tabs, space, newline)
  System.out.println(hasWhiteSpace.replaceAll("\\s", "_"));
  //tabs only
  System.out.println(hasWhiteSpace.replaceAll("\\t", "X"));
  //non-whitespace
  System.out.println(hasWhiteSpace.replaceAll("\\S", "X"));
  
  //except for underscore
  System.out.println(hasWhiteSpace.replaceAll("\\W", "X"));
  //replace everything other than whitespace
  System.out.println(hasWhiteSpace.replaceAll("\\w", "X"));
  
  //word boundaries b (surround each word with Xs) think HTML tags
  System.out.println(hasWhiteSpace.replaceAll("\\b", "X"));`;

  constructor() { }

  ngOnInit(): void {
  }

  onHighlight(e) {
    this.response = {
      language: e.language,
      relevance: e.relevance,
      second_best: '{...}',
      top: '{...}',
      value: '{...}'
    }
  }
}
