import { TestBed, inject } from '@angular/core/testing';
import { ShellComponent } from './shell.component';
import { Shell } from './shell.service';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';

describe('Shell', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderComponent, ShellComponent, FooterComponent],
      providers: [],
    });
  });

  describe('childRoutes', () => {
    it('should create routes as children of shell', () => {
      // Prepare
      const testRoutes = [{ path: 'test' }];

      // Act
      const result = Shell.childRoutes(testRoutes);

      // Assert
      expect(result.path).toBe('');
      expect(result.children).toBe(testRoutes);
      expect(result.component).toBe(ShellComponent);
    });
  });
});
