import { Component } from "@angular/core";

@Component ({
  selector: 'app-szervezet-kgy',
  templateUrl: './szervezet-kgy.component.html',
  styleUrls: ['./szervezet-kgy.component.css']
})
export class SzervezetKuldottgyulesComponent {
  kgyObject = [
  {
    year: '2019',
    brief: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque urna lectus, molestie ac tortor nec, mollis egestas magna. Donec gravida, urna et viverra fermentum, urna justo elementum tortor, nec pharetra justo turpis vel est. Praesent in ex varius, dignissim diam ac, placerat sapien. Maecenas facilisis tristique finibus. Donec non luctus nisi, id vehicula tellus. Morbi ullamcorper semper porta. Ut id velit dui. Sed a arcu tincidunt, auctor nulla id, commodo quam.',
    members: [
    {
      name: 'Lorem ipsum',
      committees: ['asd1','asd2']
    },
    {
      name: 'Lorem ipsum',
      committees: ['asd1','asd2']
    },
    {
      name: 'Lorem ipsum',
      committees: ['asd1',]
    },
    {
      name: 'Lorem ipsum',
      committees: ['asd1','asd2']
    },
    {
      name: 'Lorem ipsum',
      committees: ['asd2']
    },
    {
      name: 'Lorem ipsum',
      committees: ['asd1','asd2']
    },
    {
      name: 'Lorem ipsum',
      committees: ['asd2']
    }]
  },
  {
    year: '2020',
    brief: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque urna lectus, molestie ac tortor nec, mollis egestas magna. Donec gravida, urna et viverra fermentum, urna justo elementum tortor, nec pharetra justo turpis vel est. Praesent in ex varius, dignissim diam ac, placerat sapien. Maecenas facilisis tristique finibus. Donec non luctus nisi, id vehicula tellus. Morbi ullamcorper semper porta. Ut id velit dui. Sed a arcu tincidunt, auctor nulla id, commodo quam.',
    members: [
      {
        name: 'Lorem ipsum',
        committees: ['asd1','asd2']
      },
      {
        name: 'Lorem ipsum',
        committees: ['asd1','asd2']
      },
      {
        name: 'Lorem ipsum',
        committees: ['asd1',]
      },
      {
        name: 'Lorem ipsum',
        committees: ['asd1','asd2']
      },
      {
        name: 'Lorem ipsum',
        committees: ['asd2']
      },
      {
        name: 'Lorem ipsum',
        committees: ['asd1','asd2']
      },
      {
        name: 'Lorem ipsum',
        committees: ['asd2']
      }]
  },
  {
    year: '2021',
    brief: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque urna lectus, molestie ac tortor nec, mollis egestas magna. Donec gravida, urna et viverra fermentum, urna justo elementum tortor, nec pharetra justo turpis vel est. Praesent in ex varius, dignissim diam ac, placerat sapien. Maecenas facilisis tristique finibus. Donec non luctus nisi, id vehicula tellus. Morbi ullamcorper semper porta. Ut id velit dui. Sed a arcu tincidunt, auctor nulla id, commodo quam.',
    members: [
      {
        name: 'Lorem ipsum',
        committees: ['asd1','asd2']
      },
      {
        name: 'Lorem ipsum',
        committees: ['asd1','asd2']
      },
      {
        name: 'Lorem ipsum',
        committees: ['asd1',]
      },
      {
        name: 'Lorem ipsum',
        committees: ['asd1','asd2']
      },
      {
        name: 'Lorem ipsum',
        committees: ['asd2']
      },
      {
        name: 'Lorem ipsum',
        committees: ['asd1','asd2']
      },
      {
        name: 'Lorem ipsum',
        committees: ['asd2']
      }]
  }]
}
